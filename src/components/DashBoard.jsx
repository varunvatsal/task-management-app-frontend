import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import styles from '../css/dashBoard.module.css'
import { useNavigate } from 'react-router-dom'
const DashBoard = () => {

  let navigate = useNavigate()

  let [todoSummary, setTodoSummary] = useState({
      totalTask: 0,
      taskCompleted: 0,
      taskPending: 0,
      totalTimeOfCompletedTask: 0,
      totalTimeLapsedForPendingTask: 0,
      estimatedTimeToFinishPendingTask: 0,
      priorityWiseSummary: []
  })

  let {totalTask, taskCompleted, taskPending, totalTimeOfCompletedTask, totalTimeLapsedForPendingTask, estimatedTimeToFinishPendingTask, priorityWiseSummary} = todoSummary
  
  useEffect(() => {
    axios.get('https://task-management-app-backend-version2.vercel.app/todoApp/getStatistic', {withCredentials: true})
    .then((response) => {
      console.log(response)
      setTodoSummary(response.data.data)
    })
    .catch((error) => {
      console.log(error)
      // navigate('/unauthorizedReq')
    })
  }, [])

  return (
    <>
        <div className={styles.dashboard}>
          <h1 className={styles.heading}>Dash Board</h1>
          <h2 className={styles.subheading}>Summary</h2>
          <div className={styles.summary}>
            <h3>Total Tasks: {totalTask}</h3>
            <h3>Task Completed: {(taskCompleted / totalTask) * 100}%</h3>
            <h3>Task Pending: {(taskPending / totalTask) * 100}%</h3>
            <h3>
              Average Time per Completed Task:{" "}
              {taskCompleted > 0
                ? (totalTimeOfCompletedTask / taskCompleted).toFixed(2)
                : "N/A"}{" "}
              hrs
            </h3>
          </div>
          <h2 className={styles.subheading}>Pending Task Summary</h2>
          <div className={styles.summary}>
            <h3>Pending Tasks: {taskPending}</h3>
            <h3>Total Time Lapsed: {totalTimeLapsedForPendingTask.toFixed()}</h3>
            <h3>
              Estimated Time to Finish: {estimatedTimeToFinishPendingTask.toFixed(1)} hrs
            </h3>
          </div>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Task Priority</th>
                  <th>Completed Tasks</th>
                  <th>Pending Tasks</th>
                  <th>Time Lapsed (hrs)</th>
                  <th>Time to Finish (hrs)</th>
                </tr>
              </thead>
              <tbody>
                {priorityWiseSummary.map((ele, index) => {
                  return (
                    <Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{ele.completedTask}</td>
                        <td>{ele.pendingTask}</td>
                        <td>{ele.timeLapsed.toFixed(1)}</td>
                        <td>{ele.timeTofinish.toFixed(1)}</td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
      </div>
    </>
  )
}

export default DashBoard