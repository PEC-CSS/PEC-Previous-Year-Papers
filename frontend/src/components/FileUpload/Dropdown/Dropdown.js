import classes from './Dropdown.module.css';

export default function Dropdown({ label, value, options, onChange, courseCode, onDescChange, courseCodeDesc }) {
    return (
      <div className={classes["popupOptionSelf"]}>
        <label htmlFor="data">{label}</label>
        {
          label==='Department' ?
            <select name='data' id='data' style={{ width: "384px", borderRadius: "10px" }} onChange={onChange} value={value}>
              {
                options.map(op =>{
                  return <option key={op._id} value={op.name}>{op.name}</option>
                })
              }
            </select> : 
            label === 'Course Code' && courseCode && courseCode !== 'Enter Manually' ?
            <select name='data' id='data' style={{ width: "384px", borderRadius: "10px" }} onChange={onChange} value={value}>
              {
                options.map(op =>{
                  return <option key={op._id} value={op.courseCode}>{op.courseCode}</option>
                })
              }
            </select> : 
            label === 'Course Code' && courseCode && courseCode === 'Enter Manually' ?
            <div>
              <select name='data' id='data' style={{ width: "120px", borderRadius: "10px", height: '22px' }} onChange={onChange} value={value}>
                {
                  options.map(op =>{
                    return <option key={op._id} value={op.courseCode}>{op.courseCode}</option>
                  })
                }
              </select>
              <input type="text" style={{ marginLeft:'4px', width: "250px", borderRadius: "10px" }} placeholder='Enter Code in format CSN102 or CS1002' onChange={onDescChange} value={courseCodeDesc}/>
            </div>  :
            label === 'Course Name' && courseCode && courseCode !== 'Enter Manually' ?
            <select name='data' id='data' style={{ width: "384px", borderRadius: "10px" }} onChange={onChange} value={value} disabled>
              {
                options.map(op =>{
                  return <option key={op._id} value={op.courseName}>{op.courseName}</option>
                })
              }
            </select> :
            label === 'Course Name' ? 
              <input type="text" style={{ width: "375px", borderRadius: "10px" }} placeholder='Enter Course Name' onChange={onChange} value={value}/> :
            label === 'Paper Type' ?
            <select name='data' id='data' style={{ width: "384px", borderRadius: "10px" }} onChange={onChange} value={value}>
              {
                options.map((op, idx) =>{
                  return <option key={idx} value={op}>{op}</option>
                })
              }
            </select> : 
            label === 'Paper Year' ?
              <input type="text" style={{ width: "375px", borderRadius: "10px" }} value={value} onChange={onChange}/> :
            label === 'Paper Semester' ?
            <select name='data' id='data' style={{ width: "384px", borderRadius: "10px" }} onChange={onChange} value={value}>
              {
                options.map((op, idx) =>{
                  return <option key={idx} value={op}>{op}</option>
                })
              }
            </select> :
            label === 'Paper Programme' ?
            <select name='data' id='data' style={{ width: "384px", borderRadius: "10px" }} onChange={onChange} value={value}>
              {
                options.map((op, idx) =>{
                  return <option key={idx} value={op}>{op}</option>
                })
              }
            </select> :  
            null
        }
      </div>
    )
  };