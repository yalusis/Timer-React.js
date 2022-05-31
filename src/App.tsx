import { useState, useEffect} from 'react';
import './App.css';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

class TimerInfo {
  timerWorking = false;

  constructor() {
    makeAutoObservable(this)
  }

  setTrueTimer(show: boolean) {
    this.timerWorking = true;
  }

  setFalseTimer(show: boolean) {
    this.timerWorking = false;
  }
}

const timerStore = new TimerInfo();

const DateShow = ({timerWorking}: { timerWorking: boolean }) => {
  const [seconds, setSecond] = useState(0);
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  

    useEffect(() => {
      if (seconds < 60 && timerWorking ) {
        setTimeout(setSecond, 1000, seconds + 1);
      } else if (seconds >= 60 && minutes < 60 && timerWorking){
        setSecond(0)
        setTimeout(setMinutes, 1000, minutes + 1);
      } else if (seconds >= 60 && minutes >= 60 && timerWorking) {
        setSecond(0);
        setMinutes(0);
        setTimeout(setHours, 1000, minutes + 1);
      }
    }, [ seconds, minutes, hours, timerWorking ]);

   return (
     <div>{hours + ":" + minutes + ":" +seconds}</div>
   )
}

const AppShowTimer = ({timerWorking}: { timerWorking: boolean }) => {
  return <div>{ timerWorking ? "Таймер працює": "" }</div>
}

const ShowTimer = observer(() => {
  const { timerWorking } = timerStore
return (
  <div>
      <button onClick={() => timerStore.setTrueTimer(timerWorking)}>Start</button>
      <button onClick={() => timerStore.setFalseTimer(timerWorking)}>Stop</button>
      <div><AppShowTimer timerWorking ={timerWorking} /></div>
      <div><DateShow timerWorking ={timerWorking} /></div>
  </div>
)})

function App() {
  return (
    <div className="App">
          <ShowTimer />
    </div>
  );
}

export default App;
