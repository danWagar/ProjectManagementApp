# ManageLazily

> A project management application built with small businesses in mind. Users can create,
> update, assign, track, and analyze their businesses projects securely on the cloud from
> any location with access to the web.

ManageLazily enables company owners, project managers, and employees to have a one-stop
project management hub where they can create projects, track project completion and due dates,
add tasks to projects, log hours worked on project tasks, and more. Built with simplicity
and usability in mind, ManageLazily is a great alternative to more complex (and expensive)
project management software.

[See the Live App Here](https://managelazily.com/)

## Usage

|                                                           Landing Page                                                            |                                                           Dashboard                                                            |
| :-------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/landing_page.png" width='60%' height='auto'> | <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/dashboard.png" width='60%' height='auto'> |

|                                                           Register                                                            |                                                             Login                                                              |
| :---------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/add_task.png" width='60%' height='auto'> | <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/edit_task.png" width='60%' height='auto'> |

- ProjectView

  <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/project_view.png" width='60%' height='auto'>

|                                                           Add Project                                                            |                                                           Edit Project                                                            |
| :------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/add_project.png" width='60%' height='auto'> | <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/edit_project.png" width='60%' height='auto'> |

|                                                           Add Task                                                            |                                                           Edit Task                                                            |
| :---------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/add_task.png" width='60%' height='auto'> | <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/edit_task.png" width='60%' height='auto'> |

- Log Hours

  <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/log_hours.png" width='60%' height='auto'>

- Profile View

  <img src="https://github.com/balayaydemir/Capstone-Group3-Client/blob/rc/screenshots/user_profile.png" width='60%' height='auto'>

## Development setup

- Clone this repo and move to the new direcotry:

  ```bash
  git clone https://github.com/balayaydemir/Capstone-Group3-Client.git YOUR_PROJECT_NAME

  cd YOUR_PROJECT_NAME
  ```

- Make a fresh start of the git history for this project and install node dependencies:

  ```bash
  rm -rf .git && git init

  npm install
  ```

- Move the example Environment file to .env:
  ```bash
  mv example.env .env
  ```
- Edit the contents of the package.json to use your new project's name:
  ```JSON
  "name": "YOUR_APP_NAME"
  ```

Firebase Setup:

- Create a Firebase project
- Register your app with Firebase
- Add Firebase project configuration to your .env:

  ```
  REACT_APP_API_KEY = YOUR_KEY_HERE
  REACT_APP_AUTH_DOMAIN = YOUR_APP.firebaseapp.com
  REACT_APP_DATABASE_URL = https://YOUR_APP.firebaseio.com/
  REACT_APP_PROJECT_ID = YOUR_APP_ID
  REACT_APP_STORAGE_BUCKET = YOUR_APP.appspot.com
  REACT_APP_MESSAGING_SENDER_ID = YOUR_SENDER_ID
  REACT_APP_APP_ID = YOUR_FIREBASE_APP_ID
  REACT_APP_MEASUREMENT_ID = YOUR_FIREBASWE_MESUREMENT_ID
  ```

- Create Cloud Firestore database via the Firebase console - see [Cloud Firestore Setup](https://firebase.google.com/docs/firestore/quickstart)
- Enable email authentication via the Firebase console
- For in-depth instructions, please visit [Firebase Docs](https://firebase.google.com/docs/web/setup)

## Scripts

Start the application:

```bash
npm start
```

Run the tests:

```bash
npm run test:open
```

## Release History

- 0.0.1
  - Work in progress

## Meta

Contributors:

- [Adam Newhouser](https://github.com/AdamNewhouser)
- [Alex Bannow](https://github.com/rbannal86)
- [Balay Aydemir](https://github.com/balayaydemir)
- [Bridger Hammond](https://github.com/reifnotreef)
- [Dan Wagar](https://github.com/danWagar)

Distributed under the MIT license. See [LICENSE.md](https://github.com/balayaydemir/Capstone-Group3-Client/blob/master/LICENSE) for more information.

## [Contributing](https://github.com/balayaydemir/Capstone-Group3-Client/blob/master/CONTRIBUTING.md)

1.  Fork it (https://github.com/yourname/yourproject/fork)
2.  Create your feature branch (git checkout -b feature/fooBar)
3.  Commit your changes (git commit -am 'Add some fooBar')
4.  Push to the branch (git push origin feature/fooBar)
5.  Create a new Pull Request

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
