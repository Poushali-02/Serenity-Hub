from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")  # Load secret key securely
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///db/users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

# Create the database
with app.app_context():
    db.create_all()

@app.route("/")
def main():
    if "user" in session:
        return render_template("index.html", user=session["user"])
    return redirect(url_for("signup"))

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        hashed_password = generate_password_hash(password)

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash("Email already registered. Please login.", "warning")
            return redirect(url_for("login"))

        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        session["user"] = email
        flash("Signup successful!", "success")
        return redirect(url_for("main"))

    return render_template("signup.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            session["user"] = email
            flash("Login successful!", "success")
            return redirect(url_for("main"))
        else:
            flash("Invalid email or password.", "danger")
            return redirect(url_for("login"))

    return render_template("login.html")

@app.route("/logout")
def logout():
    session.pop("user", None)
    flash("You have been logged out.", "info")
    return redirect(url_for("login"))

# Protected Routes (Only accessible after login)
def login_required(f):
    def wrap(*args, **kwargs):
        if "user" not in session:
            flash("Please log in to access this page.", "danger")
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    wrap.__name__ = f.__name__
    return wrap

@app.route("/games")
@login_required
def games():
    return render_template("games.html")

@app.route("/bot")
@login_required
def bot():
    return render_template("bot.html")

@app.route("/music")
@login_required
def music():
    return render_template("music.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)
