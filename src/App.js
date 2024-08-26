import React, { useState } from 'react';
import './styles.css';  // Import the CSS file

import AddEntryButton from './components/AddEntryButton';
import ViewProgressButton from './components/ViewProgressButton';
import ResetDataButton from './components/ResetDataButton';
import TextField from './components/TextField';
import ProgressLineChart from './components/ProgressLineChart';
import ActivityDistributionChart from './components/ActivityDistributionChart';
import LogWaterIntakeButton from './components/LogWaterIntakeButton';
import TrackSleepButton from './components/TrackSleepButton';
import SetFitnessGoalButton from './components/SetFitnessGoalButton';

function App() {
  const [entryInput, setEntryInput] = useState('');
  const [entries, setEntries] = useState([]);
  const [progressData, setProgressData] = useState({ labels: [], values: [] });
  const [activityData, setActivityData] = useState({ labels: [], values: [] });
  const [viewEntries, setViewEntries] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const [fitnessGoal, setFitnessGoal] = useState('');

  // Handler for Add Entry button
  const handleAddEntry = () => {
    if (entryInput) {
      setEntries([...entries, entryInput]);
      setProgressData({
        labels: [...progressData.labels, `Entry ${entries.length + 1}`],
        values: [...progressData.values, Math.random() * 100],
      });
      setActivityData({
        labels: [...activityData.labels, entryInput],
        values: [...activityData.values, Math.random() * 100],
      });
      setEntryInput('');
    }
  };

  // Handler for View Progress button
  const handleViewProgress = () => {
    setViewEntries(!viewEntries);
  };

  // Handler for Reset Data button
  const handleResetData = () => {
    setEntries([]);
    setProgressData({ labels: [], values: [] });
    setActivityData({ labels: [], values: [] });
    setViewEntries(false);
    alert('All data has been reset.');
  };

  // Handler for Log Water Intake button
  const handleLogWaterIntake = () => {
    const water = prompt('Enter water intake (in liters):');
    if (water) {
      setWaterIntake(prev => prev + parseFloat(water));
      alert(`Total water intake: ${waterIntake + parseFloat(water)} liters`);
    }
  };

  // Handler for Track Sleep button
  const handleTrackSleep = () => {
    const sleep = prompt('Enter hours of sleep:');
    if (sleep) {
      setSleepHours(prev => prev + parseFloat(sleep));
      alert(`Total sleep hours: ${sleepHours + parseFloat(sleep)} hours`);
    }
  };

  // Handler for Set Fitness Goal button
  const handleSetFitnessGoal = () => {
    const goal = prompt('Enter your fitness goal:');
    if (goal) {
      setFitnessGoal(goal);
      alert(`Your fitness goal is set to: ${goal}`);
    }
  };

  return (
    <div className="container">
      <h1>FitTrack</h1>
      <TextField value={entryInput} onChange={setEntryInput} placeholder="Enter data here" />
      <AddEntryButton onAdd={handleAddEntry} />
      <ViewProgressButton onView={handleViewProgress} />
      <ResetDataButton onReset={handleResetData} />

      <LogWaterIntakeButton onLogWater={handleLogWaterIntake} />
      <TrackSleepButton onTrackSleep={handleTrackSleep} />
      <SetFitnessGoalButton onSetGoal={handleSetFitnessGoal} />

      {viewEntries && (
        <div>
          <h2>Entered Records:</h2>
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="chart-container">
        <ProgressLineChart data={progressData} />
      </div>
      <div className="chart-container">
        <ActivityDistributionChart data={activityData} />
      </div>
    </div>
  );
}

export default App;
