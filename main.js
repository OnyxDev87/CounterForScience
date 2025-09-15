const COLUMN_SPACING = 400; // space between columns
const START_X = 10;
const START_Y = 125;
const LINE_HEIGHT = 25;

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1350
canvas.height = 630

let counter = 0
let amount_of_trials_current = localStorage.getItem("trials") ? Number(localStorage.getItem("trials")) : 1;
let data  = {1:[]};
const textPositions = []; // Store text positions for click detection

function getAverage(list) {
  let sum = 0
  for (let i = 0; i < list.length; i++) {
    sum+= list[i]
  }
  return sum/list.length
}


function convert(obj) {
  let csvContent = "";
    
  // Get the headers (keys of the object) and modify them
  const headers = Object.keys(obj).map(key => `Trial: ${key}`);
  csvContent += headers.join(",") + "\n";
  
  // Get the max length of the arrays to determine rows
  const maxLength = Math.max(...Object.values(obj).map(arr => arr.length));
  
  // Construct CSV rows
  for (let i = 0; i < maxLength; i++) {
      const row = Object.keys(obj)
          .map(key => obj[key][i] !== undefined ? obj[key][i] : "")
          .join(",");
      csvContent += row + "\n";
  }
  
  return csvContent;
}


function exportData() {
  const data_ = convert(data);
  // Create a Blob with the CSV data
  const blob = new Blob([data_], { type: 'text/csv' });

  // Create a temporary link element
  const link = document.createElement('a');

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Set the download attribute with a filename
  link.href = url;
  link.download = 'data.csv'; // You can customize the filename here

  // Programmatically trigger a click on the link to download the file
  link.click();

  // Clean up by revoking the Blob URL
  URL.revokeObjectURL(url);

}


function updateSettings() {
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("render_option", document.getElementById("Simple").checked ? "Simple" : "Complex");
  location.reload();
}



// function animateComplex() {
//   window.requestAnimationFrame(animateComplex);
//   localStorage.setItem("data", JSON.stringify(data));
//   localStorage.setItem("trials", amount_of_trials_current);

//   c.fillStyle = '#1e1e1e';
//   c.fillRect(0, 0, canvas.width, canvas.height);

//   c.fillStyle = '#d3d3d3';
//   c.font = '75px Arial';
//   c.fillText('Counter: ' + counter, 0, 60);
//   c.font = '25px Arial';
//   c.fillText("Previous Trials:", 0, 100);

//   textPositions.length = 0; // Reset stored positions

//   let yOffset = 125; // Starting y position for data display

//   Object.keys(data).forEach((trialIndex) => {
//       let trialData = data[trialIndex]; // Get data array for this trial
      
//       for (let dataIndex = 0; dataIndex < trialData.length; dataIndex++) {
//           console.log()
//           if (trialIndex == Object.keys(data).length) {
//               c.fillStyle = 'green'; // Highlight active dataset
//           } else {
//               c.fillStyle = '#d3d3d3';
//           }

//           let text = `Trial ${parseInt(trialIndex)} , case #${dataIndex+1}:  ${trialData[dataIndex]}`;
//           let x = 10;
//           let y = yOffset;

//           c.fillText(text, x, y);

//           // Store each data point's position
//           textPositions.push({ trialIndex: parseInt(trialIndex), dataIndex, x, y, text });

//           yOffset += 25; // Move down for the next entry
//       }
//   });
// }

function animateComplex() {
  window.requestAnimationFrame(animateComplex);
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("trials", amount_of_trials_current);

  c.fillStyle = '#1e1e1e';
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = '#d3d3d3';
  c.font = '75px Arial';
  c.fillText('Counter: ' + counter, 0, 60);
  c.font = '25px Arial';
  c.fillText("Previous Trials:", 0, 100);

  textPositions.length = 0;

  let y = START_Y;
  let x = START_X;

  Object.keys(data).forEach((trialIndex) => {
    let trialData = data[trialIndex];

    for (let dataIndex = 0; dataIndex < trialData.length; dataIndex++) {
      c.fillStyle = (trialIndex == Object.keys(data).length) ? 'green' : '#d3d3d3';

      let text = `Trial ${parseInt(trialIndex)}, case #${dataIndex + 1}: ${trialData[dataIndex]}`;
      c.fillText(text, x, y);

      textPositions.push({ trialIndex: parseInt(trialIndex), dataIndex, x, y, text });

      y += LINE_HEIGHT;

      // Move to next column if we exceed canvas height
      if (y + LINE_HEIGHT > canvas.height) {
        y = START_Y;
        x += COLUMN_SPACING;
      }
    }
  });
}


// Function to check if a click is within a data point
canvas.addEventListener("click", function(event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  textPositions.forEach(({ trialIndex, dataIndex, x, y, text }) => {
      const textWidth = c.measureText(text).width;
      const textHeight = 20; // Approximate height

      if (clickX >= x && clickX <= x + textWidth && clickY >= y - textHeight && clickY <= y) {
          onDataPointClick(trialIndex, dataIndex); // Execute function with trial & data indices
      }
  });
});

// Function to execute when a data point is clicked
function onDataPointClick(trialIndex, dataIndex) {
  console.log(`Clicked on Trial ${trialIndex}, Data Index ${dataIndex}`);
  //alert(`You clicked on Trial ${trialIndex}, Data Point ${dataIndex}`);
  data[trialIndex].splice(dataIndex, 1);
  
}

// function animateSimple() {
  
//   window.requestAnimationFrame(animateSimple)
//   localStorage.setItem("data", JSON.stringify(data));
//   localStorage.setItem("trials", amount_of_trials_current);

//   c.fillStyle = '#1e1e1e'
//   c.fillRect(0, 0, canvas.width, canvas.height)

//   c.fillStyle = '#d3d3d3'
//   c.font = '75px Arial'
//   c.fillText('Counter: ' + counter, 0, 60)
//   c.font = '25px Arial'
//   c.fillText("Previous Trials:", 0, 100)
//   for (let i = 0; i < Object.keys(data).length; i++) {
//     if (i === Object.keys(data).length - 1) {
//         c.fillStyle = 'green'; // Set last dataset to green
//     } else {
//         c.fillStyle = '#d3d3d3';
//     }
//     c.fillText("Trial "+(i+1) + ": " + JSON.stringify(data[JSON.stringify(i+1)]), 10, 125 + (i * 25));
//   }

//   // if (data.length >= 20) {
//   //   alert("The limit is 20 tests per list, I know its annoying, but deal with it. Just hit 'p' and keep going.")
//   //   trialList.pop()
//   // }
//   if (data.length > 0) {
//     c.font = '35px Arial'
//     c.fillText("Average: " + getAverage(data[amount_of_trials_current]), (canvas.width/2), 100)
//   }
// }

function animateSimple() {
  window.requestAnimationFrame(animateSimple);
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("trials", amount_of_trials_current);

  c.fillStyle = '#1e1e1e';
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = '#d3d3d3';
  c.font = '75px Arial';
  c.fillText('Counter: ' + counter, 0, 60);
  c.font = '25px Arial';
  c.fillText("Previous Trials:", 0, 100);

  let y = START_Y;
  let x = START_X;

  const keys = Object.keys(data);

  for (let i = 0; i < keys.length; i++) {
    const trialKey = keys[i];
    const isCurrent = (i === keys.length - 1);

    c.fillStyle = isCurrent ? 'green' : '#d3d3d3';

    const text = `Trial ${trialKey}: ${JSON.stringify(data[trialKey])}`;
    c.fillText(text, x, y);

    y += LINE_HEIGHT;

    if (y + LINE_HEIGHT > canvas.height) {
      y = START_Y;
      x += COLUMN_SPACING;
    }
  }

  if (data[amount_of_trials_current]?.length > 0) {
    c.font = '35px Arial';
    c.fillText("Average: " + getAverage(data[amount_of_trials_current]), canvas.width / 2, 100);
  }
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  switch(event.key) {
    case "r":
      if (!data[amount_of_trials_current]) data[amount_of_trials_current] = [];
      data[amount_of_trials_current].push(counter);
      counter = 0;
      break;
    case "p":
      amount_of_trials_current = 1;
      data = {1:[]};
      counter = 0;
      break;
    case "e":
      amount_of_trials_current++;
      data[amount_of_trials_current] = [];
      counter = 0;
      break;
    case " ":
      counter++;
      break;
    case "Backspace":
    case "Delete":
      if (counter < 1) {
        return
      } else counter--
      break;
    }
});

data = localStorage.getItem("data") ?  JSON.parse(localStorage.getItem("data")) : {1:[]}

if (localStorage.getItem("render_option") == "Simple") {
  document.getElementById("Simple").checked = "balls"
  document.getElementById("Complex").removeAttribute("checked");
  animateSimple();
} else {
  document.getElementById("Complex").checked = "balls"
  document.getElementById("Simple").removeAttribute("checked");
  console.log("complex")
  animateComplex();
}
