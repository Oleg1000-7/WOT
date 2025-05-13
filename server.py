from flask import Flask, render_template, request, redirect
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_restful import Api

from forms.login_form import LoginForm
from forms.register_form import RegisterForm
from models.users import User
from models.results import Results
from resources.event_resource import EventResource, EventsListResource

from db.db import *
import os

app = Flask(__name__)
login_manager = LoginManager()
login_manager.init_app(app)
file_path = os.path.abspath(os.getcwd()) + "/db/database.db"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + file_path
app.config['SECRET_KEY'] = ")w%yk#&jj0(ng*hob_p-ssx74&o5hg)94n18-(%@hudru010hp"

db.init_app(app)

with app.app_context():
    db.create_all()

api = Api(app)
api.add_resource(EventsListResource, '/api/v2/events')
api.add_resource(EventResource, '/api/v2/events/<int:event_id>')


@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).get(user_id)


@app.route("/")
@app.route("/index")
def index():
    if request.method == "GET":
        return render_template("index.html", title="Главная")
    else:
        return {"status": "ok"}


@app.route("/check_res", methods=["POST"])
@login_required
def check_res():
    req = request.json
    r = Results(
        user_id=current_user.id,
        months=f"{req["left_date"]} - {req["right_date"]}",
        percents=round(req["percent"], 1)
    )
    db.session.add(r)
    db.session.commit()
    return ""


@app.route("/res_remove/<int:id>", methods=["GET", "POST"])
@login_required
def res_delete(id):
    res = db.session.query(Results).filter(Results.id == id).first()
    if res:
        db.session.delete(res)
        db.session.commit()
    else:
        return "Game result not found", 404
    return redirect("/profile")


@app.route("/check")
def check():
    return render_template("check.html", title="Тест")


@app.route("/contacts")
def contacts():
    return render_template("contacts.html", title="Контакты")


@app.route("/about")
def about():
    return render_template("about.html", title="О сайте")


@app.route('/register', methods=['GET', 'POST'])
def reqister():
    form = RegisterForm()
    if form.validate_on_submit():
        if form.password.data != form.password_again.data:
            return render_template('register.html', title='Регистрация',
                                   form=form,
                                   message="Пароли не совпадают")
        if db.session.query(User).filter(User.email == form.email.data).first():
            return render_template('register.html', title='Регистрация',
                                   form=form,
                                   message="Такой пользователь уже есть")

        user = User(
            name=form.name.data,
            email=form.email.data,
        )
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect('/login')
    return render_template('register.html', title='Регистрация', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = db.session.query(User).filter(User.email == form.email.data).first()
        if user and user.check_password(form.password.data):
            login_user(user, remember=form.remember_me.data)
            return redirect("/")
        return render_template('login.html',
                               message="Неправильный логин или пароль",
                               title="Авторизация",
                               form=form)
    return render_template('login.html', title='Авторизация', form=form)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect("/")


@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    results = db.session.query(Results).filter(Results.user_id == current_user.id).all()
    if os.path.exists(f"static/profile_pics/{current_user.id}/image.jpg"):
        path = f"static/profile_pics/{current_user.id}/image.jpg"
    else:
        path = "static/profile_pics/default/image.jpg"
    if request.method == 'POST':
        os.makedirs(f"static/profile_pics/{current_user.id}", exist_ok=True)
        with open(f"static/profile_pics/{current_user.id}/image.jpg", "wb") as file:
            file.write(request.files["file"].read())
    return render_template('profile.html', title="Профиль", results=results, path=path)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
