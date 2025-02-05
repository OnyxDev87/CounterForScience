const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1350
canvas.height = 630

let counter = 0
let amount_of_trials_current = 0;
let data  = {};


function getAverage(list) {
  let sum = 0
  for (let i = 0; i < list.length; i++) {
    sum+= list[i]
  }
  return sum/list.length
}

function convert(items) {
  // Get the header (keys) of the items object
  const header = Object.keys(items);

  // Get the values of the items object
  const values = Object.values(items);

  // Join the header and values into CSV format
  const csv = [
    header.join(','), // header row first
    values.join(',')  // values row
  ].join('\r\n');     // Join both rows with a line break

  return csv;
}

function exportData() {
  let items = {};
  for (let i = 0; i < trialList.length; i++) {
    items[("Trial " + (i+1))] = trialList[i];
  }
  const data = convert(items);
  // Create a Blob with the CSV data
  const blob = new Blob([data], { type: 'text/csv' });

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


function animate() {
  window.requestAnimationFrame(animate)

  c.fillStyle = '#1e1e1e'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.fillStyle = '#d3d3d3'
  c.font = '75px Arial'
  c.fillText('Counter: ' + counter, 0, 60)
  c.font = '25px Arial'
  c.fillText("Previous Trials:", 0, 100)
  for (let i = 0; i < trialList.length; i++) {
    c.fillText(JSON.stringify(trialList[i]), 10, 125+(i*25))
  }

  if (trialList.length >= 20) {
    alert("The limit is 20 tests per list, I know its annoying, but deal with it. Just hit 'p' and keep going.")
    trialList.pop()
  }
  if (trialList.length > 0) {
    c.font = '35px Arial'
    c.fillText("Average: " + getAverage(trialList), (canvas.width/2), 100)
  }
}

document.addEventListener("keydown", (event) => {
  switch(event.key) {
    case "r":
      data[amount_of_trials_current].push(counter);
      counter = 0;
      break;
    case "p":
      data = [];
      counter = 0;
      break;
    case "e":
      amount_of_trials_current++;
      counter = 0;
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


animate()