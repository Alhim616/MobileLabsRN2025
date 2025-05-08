const initialTasks = [
    { id: '1', title: 'Make 10 clicks', condition: 'clicks', target: 10 },
    { id: '2', title: 'Double-tap 5 times', condition: 'doubleTaps', target: 5 },
    { id: '3', title: 'Hold object for 3 seconds', condition: 'longPress', target: 1 },
    { id: '4', title: 'Drag object around', condition: 'panned', target: 1 },
    { id: '5', title: 'Swipe right', condition: 'flingRight', target: 1 },
    { id: '6', title: 'Swipe left', condition: 'flingLeft', target: 1 },
    { id: '7', title: 'Resize object', condition: 'pinched', target: 1 },
    { id: '8', title: 'Get 100 points', condition: 'score', target: 100 },
  ];

  export default initialTasks;