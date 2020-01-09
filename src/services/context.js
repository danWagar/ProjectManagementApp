import React from 'react';
import { db, auth } from './firebase';

const FirebaseContext = React.createContext({
  user: {
    id: '',
    name: '',
    org: {
      id: '',
      name: ''
    }
  },
  employees: [],
  projects: [],
  jobs: [],
  setUser: () => {},
  setOrgId: () => {},
  setEmployees: () => {},
  setProjects: () => {},
  setJobs: () => {},
  watchAuth: () => {},
  doCreateUserWithEmailAndPassword: () => {},
  doSignInWithEmailAndPassword: () => {},
  doSignOut: () => {},
  doPasswordReset: () => {},
  doPasswordUpdate: () => {},
  doGetProject: () => {},
  doGetProjectJobs: () => {}
});

export default FirebaseContext;

export class ContextProvider extends React.Component {
  state = {
    user: {
      id: '',
      name: '',
      org: {
        id: '',
        name: ''
      },
      role: '',
    },
      employees: [],
      projects: [],
      jobs: []
  };

  setUser = email => {
    return db
      .collection('users')
      .where('email', '==', `${email}`)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data());
          this.setState({
            user: {
              id: doc.id,
              name: doc.data().name,
              org: {
                name: doc.data().organization
              },
              role: doc.data().role
            }
          });
        });
      })
      .then(() => console.log(this.state))
      .catch(error => console.log(error));
  };

  setOrgId = org => {
    console.log(org);
    return db
      .collection('organizations')
      .where('name', '==', `${org}`)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({
            user: {
              ...this.state.user,
              org: {
                ...this.state.user.org,
                id: doc.id
              }
            }
          });
        });
      })
      .catch(error => console.log(error));
  };

  setEmployees = org => {
    console.log(org);
    return db
      .collection('users')
      .where('organization', '==', `${org}`)
      .get()
      .then(snapshot => {
        const employees = [];
        snapshot.forEach(doc => {
          employees.push(doc.data());
        });
        this.setState({
          employees: employees
        });
      })
      .catch(error => console.log(error));
  };

  setProjects = (role, name) => {
    return db
      .collection(`organizations/HkeHO8n1eIaJSu6mnsd5/projects`)
      .get()
      .then(snapshot => {
        const projects = [];
        if (role === 'project worker') {
          snapshot.forEach(doc => {
            if (doc.data().project_workers.includes(name)) {
              projects.push({ id: doc.id, ...doc.data() });
            }
          });
        } else if (role === 'project manager') {
          snapshot.forEach(doc => {
            if (doc.data().project_manager === name) {
              const projectObj = {
                id: doc.id,
                date_created: doc.data().date_created,
                deadline: doc.data().deadline,
                description: doc.data().description,
                name: doc.data().name,
                org_id: doc.data().org_id,
                progress: doc.data().progress,
                project_manager: doc.data().project_manager,
                project_workers: doc.data().project_workers,
              }
              projects.push(projectObj);
            }
          });
        } else {
          snapshot.forEach(doc => {
            const projectObj = {
              id: doc.id,
              date_created: doc.data().date_created,
              deadline: doc.data().deadline,
              description: doc.data().description,
              name: doc.data().name,
              org_id: doc.data().org_id,
              progress: doc.data().progress,
              project_manager: doc.data().project_manager,
              project_workers: doc.data().project_workers,
            }
            projects.push(projectObj);
          });
        }
        this.setState({
          projects: projects
        });
      })
      .then(() => {
        this.setJobs(role, name);
      })
      .catch(error => console.log(error));
  };

  setJobs = (role, name) => {
    console.log(role, name);
    this.state.projects.forEach(project => {
      console.log(`organization/${this.state.user.org.id}/projects/${project.id}/jobs`);
      db.collection(`organizations/${this.state.user.org.id}/projects/${project.id}/jobs`)
        .get()
        .then(snapshot => {
          const jobs = [];
          if (role === 'project worker') {
            console.log('Getting jobs');
            console.log(snapshot);
            snapshot.forEach(doc => {
              console.log(doc.data());
              if (doc.data().project_workers.includes(name)) {
                jobs.push({ id: doc.id, ...doc.data() });
              }
            });
          } else if (role === 'project manager') {
            snapshot.forEach(doc => {
              if (doc.data().project_manager === name) {
                jobs.push({ id: doc.id, ...doc.data() });
              }
            });
          } else {
            snapshot.forEach(doc => {
              jobs.push({ id: doc.id, ...doc.data() });
            });
          }
          console.log(jobs);
          console.log(this.state.jobs);
          this.setState({
            jobs: [...jobs]
          });
        })
        .catch(error => console.log(error));
    });
  };
  
  addProject = (newProject) => {
    db.collection(`organization/${this.state.user.org.id}/projects`)
      .add(newProject)
  }

<<<<<<< HEAD
  watchAuth = () => auth.onAuthStateChanged(user => user);
=======
  addJob = (newJob, project_id) => {
    db.collection(`organization/${this.state.user.org.id}/projects/${project_id}/jobs`)
      .add(newJob)
  }

  addUser = (newUser) => {
    db.collection('users').add(newUser)
  }


  watchAuth = () => this.auth().onAuthStateChanged(user => user);
>>>>>>> 6ba15de025a107f70ca413263c16e56bb8198417

  doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

  doSignOut = () =>
    auth
      .signOut()
      .then(res => this.setState({ user: null }))
      .catch(error => console.log(error));

  doPasswordReset = email => auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => auth.currentUser.updatePassword(password);

  doGetProject = (org_id = 'HkeHO8n1eIaJSu6mnsd5') => {
    return db
      .collection('organizations')
      .doc(org_id)
      .collection('projects')
      .get();
  };

  doGetProjectJobs = (org_id = 'HkeHO8n1eIaJSu6mnsd5', project_id = 'FUFRX6873V2Llg9XQJBt') => {
    return db
      .collection('organizations')
      .doc(org_id)
      .collection('projects')
      .doc(project_id)
      .collection('jobs')
      .get();
  };

  render() {
    const value = {
      user: this.state.user,
      employees: this.state.employees,
      projects: this.state.projects,
      jobs: this.state.jobs,
      setUser: this.setUser,
      setOrgId: this.setOrgId,
      setEmployees: this.setEmployees,
      setProjects: this.setProjects,
      setJobs: this.setJobs,
      watchAuth: this.watchAuth,
      doCreateUserWithEmailAndPassword: this.doCreateUserWithEmailAndPassword,
      doSignInWithEmailAndPassword: this.doSignInWithEmailAndPassword,
      doSignOut: this.doSignOut,
      doPasswordReset: this.doPasswordReset,
      doPasswordUpdate: this.doPasswordUpdate,
      doGetProject: this.doGetProject,
      doGetProjectJobs: this.doGetProjectJobs
    };
    return <FirebaseContext.Provider value={value}>{this.props.children}</FirebaseContext.Provider>;
  }
}
