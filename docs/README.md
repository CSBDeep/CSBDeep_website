How to build CSS style file:

- Install `autoprefixer`
```
sudo npm install -g npx
sudo npm install -g postcss-cli autoprefixer
```
- Run it each time a CSS file changes
```
npx postcss css/style.css --use autoprefixer -d build/
```
