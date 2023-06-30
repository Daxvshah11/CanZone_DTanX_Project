from flask import Flask, request, render_template
import sqlite3
import json

app = Flask(__name__)


@app.route("/About.html")
def About():
    return render_template("About.html")


@app.route("/ALBcpGhost.html")
def ALBcpGhost():
    return render_template("ALBcpGhost.html")


@app.route("/ALBcpHeadfull.html")
def ALBcpHeadfull():
    return render_template("ALBcpHeadfull.html")


@app.route("/ALBcpMusicOfSpheres.html")
def ALBcpMusicOfSpheres():
    return render_template("ALBcpMusicOfSpheres.html")


@app.route("/ALBcpParachutes.html")
def ALBcpParachutes():
    return render_template("ALBcpParachutes.html")


@app.route("/ALBcpVivaLaVida.html")
def ALBcpVivaLaVida():
    return render_template("ALBcpVivaLaVida.html")


@app.route("/ALBdrDarkLane.html")
def ALBdrDarkLane():
    return render_template("ALBdrDarkLane.html")


@app.route("/ALBdrNothing.html")
def ALBdrNothing():
    return render_template("ALBdrNothing.html")


@app.route("/ALBdrScorpion.html")
def ALBdrScorpion():
    return render_template("ALBdrScorpion.html")


@app.route("/ALBdrTakeCare.html")
def ALBdrTakeCare():
    return render_template("ALBdrTakeCare.html")


@app.route("/ALBdrViews.html")
def ALBdrViews():
    return render_template("ALBdrViews.html")


@app.route("/ALBes+.html")
def ALBesPlus():
    return render_template("ALBes+.html")


@app.route("/ALBes=.html")
def ALBesEquals():
    return render_template("ALBes=.html")


@app.route("/ALBes5.html")
def ALBes5():
    return render_template("ALBes5.html")


@app.route("/ALBesDivide.html")
def ALBesDivide():
    return render_template("ALBesDivide.html")


@app.route("/ALBesX.html")
def ALBesX():
    return render_template("ALBesX.html")


@app.route("/ALBjbBelieve.html")
def ALBjbBelieve():
    return render_template("ALBjbBelieve.html")


@app.route("/ALBjbChanges.html")
def ALBjbChanges():
    return render_template("ALBjbChanges.html")


@app.route("/ALBjbJustice.html")
def ALBjbJustice():
    return render_template("ALBjbJustice.html")


@app.route("/ALBjbMyWorld.html")
def ALBjbMyWorld():
    return render_template("ALBjbMyWorld.html")


@app.route("/ALBjbPurpose.html")
def ALBjbPurpose():
    return render_template("ALBjbPurpose.html")


@app.route("/ALBtsEvermore.html")
def ALBtsEvermore():
    return render_template("ALBtsEvermore.html")


@app.route("/ALBtsFolklore.html")
def ALBtsFolklore():
    return render_template("ALBtsFolklore.html")


@app.route("/ALBtsLover.html")
def ALBtsLover():
    return render_template("ALBtsLover.html")


@app.route("/ALBtsMidnights.html")
def ALBtsMidnights():
    return render_template("ALBtsMidnights.html")


@app.route("/ALBtsRed.html")
def ALBtsRed():
    return render_template("ALBtsRed.html")


@app.route("/artistspage.html")
def artistspage():
    return render_template("artistspage.html")


@app.route("/coldplay.html")
def coldplay():
    return render_template("coldplay.html")


@app.route("/drake.html")
def drake():
    return render_template("drake.html")

@app.route("/")
def Hp():
    return render_template("HomePage.html")


@app.route("/edsheeran.html")
def edsheeran():
    return render_template("edsheeran.html")


@app.route("/HomePage.html")
def homepage():
    return render_template("HomePage.html")


@app.route("/justin.html")
def justin():
    return render_template("justin.html")


# @app.route("/PlayList.html")
# def PlayList():
#     return render_template("PlayList.html")


@app.route("/SearchPage.html")
def SearchPage():
    return render_template("SearchPage.html")


@app.route("/SpotLightPage.html")
def SpotLightPage():
    return render_template("SpotLightPage.html")


@app.route("/ts.html")
def ts():
    return render_template("ts.html")


@app.route("/check_song/<songID>")
def check_song(songID):
    try:
        conn = sqlite3.connect("playlist.db")
        c = conn.cursor()

        c.execute("SELECT EXISTS(SELECT 1 FROM playlist WHERE songID = ?)", (songID,))
        result = c.fetchone()

        conn.close()

        return json.dumps({"exists": result[0]})
    except Exception as e:
        print(e)
        return json.dumps({"exists": False})


@app.route("/store_data", methods=["POST"])
def store_data():
    data = request.get_json()

    # Store data in SQLite3 database
    conn = sqlite3.connect("playlist.db")
    c = conn.cursor()

    c.execute(
        """CREATE TABLE IF NOT EXISTS playlist
                 (songName TEXT, songDuration TEXT, album TEXT, artistID TEXT, songID TEXT)"""
    )

    c.execute(
        "INSERT INTO playlist VALUES (?, ?, ?, ?, ?)",
        (
            data["songName"],
            data["songDuration"],
            data["album"],
            data["artistID"],
            data["songID"],
        ),
    )
    conn.commit()
    conn.close()

    return "", 204


@app.route("/delete_song", methods=["POST"])
def delete_song():
    data = request.get_json()

    # Delete song from SQLite3 database
    conn = sqlite3.connect("playlist.db")
    c = conn.cursor()

    c.execute("DELETE FROM playlist WHERE songID=?", (data["songID"],))
    conn.commit()
    conn.close()

    return "", 204


@app.route("/PlayList.html")
def playlist():
    # Fetch data from SQLite3 database
    conn = sqlite3.connect("playlist.db")
    c = conn.cursor()
    c.execute("SELECT * FROM playlist")
    rows = c.fetchall()
    conn.close()

    # Generate HTML for table rows
    rows_html = ""
    for row in rows:
        song_name = row[0]
        song_duration = row[1]
        album = row[2]
        artist_id = row[3]
        song_id = row[4]

        row_html = f"""
            <tr>
                <td>{song_name}</td>
                <td>{artist_id}</td>
                <td>{album}</td>
                <td>{song_duration}</td>
                <td><button class="delete_button" data-songid="{song_id}">-</button></td>
            </tr>
        """

        rows_html += row_html

    # Render PlayList.html template with dynamic rows
    return render_template("PlayList.html", rows=rows_html)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
