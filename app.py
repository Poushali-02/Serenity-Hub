from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.route('/bot')
def bot():
    return render_template("bot.html")

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

@app.route('/games')
def games():
    return render_template("games.html")

@app.route('/music')
def music():
    return render_template("music.html")

@app.route('/about')
def about():
    return render_template("about.html")

if __name__ == '__main__':
    app.run(debug=True)