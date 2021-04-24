const mysql = require('mysql');
const path = require('path')

// Database
//Available


const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Register1',
    database: 'top_songsdb',
  });
  

const topAlbums = (artist) => {
    console.log("Hello")
    const query = `
    SELECT song_year, topalbums.position, artist_name, song_name, album
    from top5000
    join topalbums
       on top5000.artist_name = topalbums.artist
       and top5000.song_year = topalbums.releaseyear
    where artist_name = '${artist}'
    order by song_year`

    console.log(`Selecting all top albums ${artist} ...\n`);
    connection.query(query, 
    (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    });
  };




connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    topAlbums('Celine Dion');
    connection.end();

  });
  