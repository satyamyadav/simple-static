# simple-static

simple-static is a static template boilerplate, includes gulp tasks to concat and minify sass, js and bower packages from proper directory structure.
It contains a index.html served via gulp serve task , bootstrap saas with custom variables and custom sass components , color functions and spinner.

> you can start developing a bootstrap template with jquery plugins in 5 mins !

it can be extended to write js app in proper modular structure.

An extended version of this boilerplate uses lodash partials to render json data from localstorage and ajax request in ejs template partials.
[Find it here](https://github.com/satyamyadav/resume)

#### requirements

 - nodejs
 - npm
 - bower
 - gulp

#### setup instructions

  -  `git clone https://github.com/satyamyadav/simple-static.git`

  - `cd simple-static`

  - `npm install`

  - `bower install`

  - `gulp compile`

  - `gulp serve`

  - `open http://localhost:8000` in web browser


#### development

  - `gulp compile`   compile everything

  - `gulp serve`  run static server

  - `gulp watch`   watch and build during development

*run `gulp watch` and `gulp serve` in different instances of terminal*

#### gulp tasks

  - `gulp serve`  run static server

  - `gulp bower`   compile bower libs

  - `gulp sass:watch`   watch sass

  - `gulp app`  compile app

  - `gulp assets`   compile assets

  - `gulp clean`   clean build

  - `gulp compile`   compile everything

  - `gulp watch`   watch and build during development


[*find example here* - ` http://satyamyadav.github.io/simple-static`](http://satyamyadav.github.io/simple-static)
