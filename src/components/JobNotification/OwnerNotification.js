import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dbServices from '../../services/dbServices'
import { AuthContext } from '../../services/Auth'
import Swal from 'sweetalert2'

export default class OwnerNotification extends Component {
  state = {
    newEmployees: null,
    newProjects: null,
    completedProjects: null,
  }

  static contextType = AuthContext

  handleNewEmployee = async employee => {
    try {
      employee.new = false
      // await dbServices.updateWorker();
      await dbServices.updateWorker(employee, this.context.currentUser.org)
      this.props.updateList(employee)
      this.setState({
        newEmployees: this.props.newEmployees,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Employee status failed to update.',
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }

  handleClick = async (project, type) => {
    project.alert = false
    await dbServices
      .updateProject(project)
      .then(this.props.updateProjectList(project, type))
  }

  renderNewEmployees = () => {
    if (this.props.newEmployees.length > 0) {
      return this.props.newEmployees.map((employee, index) => {
        return (
          <li key={index + employee}>
            <Link
              to={`/profile/${employee.email}`}
              onClick={() => this.handleNewEmployee(employee)}
            >
              {employee.name} has joined your organization!
            </Link>
            <button onClick={() => this.handleNewEmployee(employee)}>X</button>

            {/* <button onClick={e => this.handleNewEmployee(e, employee)}>
              Cool.
            </button> */}
          </li>
        )
      })
    }
  }

  renderNewProjects = () => {
    if (this.props.newProjects.length > 0) {
      return this.props.newProjects.map(project => {
        return (
          <li key={project.id}>
            <Link
              onClick={() => this.handleClick(project, 'new')}
              to={{ pathname: `/project/${project.id}` }}
            >
              {project.name} has started.
            </Link>
            <button onClick={() => this.handleClick(project, 'new')}>X</button>
          </li>
        )
      })
    }
  }

  renderCompletedProjects = () => {
    if (this.props.completedProjects.length > 0) {
      return this.props.completedProjects.map(project => {
        return (
          <li key={project.id}>
            <Link
              onClick={() => this.handleClick(project, 'completed')}
              to={{ pathname: `/project/${project.id}` }}
            >
              {project.name} has been completed!
            </Link>
            <button onClick={() => this.handleClick(project, 'completed')}>
              X
            </button>
          </li>
        )
      })
    }
  }

  componentDidMount() {
    this.setState({
      newEmployees: this.props.newEmployees,
      newProjects: this.props.newProjects,
      completedProjects: this.props.completedProjects,
    })
  }

  render() {
    return (
      <div>
        <ul className="JobNotification__list">
          {this.renderNewEmployees()}
          {this.renderNewProjects()}
          {this.renderCompletedProjects()}
        </ul>
      </div>
    )
  }
}
