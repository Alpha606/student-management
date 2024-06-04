 import video1 from '../pages/assets/addStudent.mp4'
import video2 from '../pages/assets/DeactivateStudent.mp4'
  import video3 from '../pages/assets/search and update.mp4'
  import './videocomponent.css'

function VideoComponent() {
    return (
      <div class="container">
<video src={video1} width="600" height="600" controls="controls" autoPlay={true}  />   
<p>This is working of add student </p>  
 <video src={video2} width="600" height="300" controls="controls" autoPlay={true} />  
<p>This is working of deactivate student      
</p>  
<video src={video3} width="600" height="300" controls="controls" autoPlay={true} /> 
<p>This is working of updation and search of specific student name .     
</p>  

      </div>
    );
  }

export default VideoComponent

