rm prov.zip;
zip -q -r prov.zip ./README.md dist logs postcss.config.js server syncftp.sh build favicon.ico public server.js testconfigs favicon.ico.bak package.json robots.txt src utils;
sftp root@120.55.63.130:/root/www/coserfuli/server;
put prov.zip;