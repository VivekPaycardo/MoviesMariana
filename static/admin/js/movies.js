const minEl = document.querySelector('#min');
const maxEl = document.querySelector('#max');
 
// Custom range filtering function
DataTable.ext.search.push(function (settings, data, dataIndex) {
    let min = parseInt(minEl.value, 10);
    let max = parseInt(maxEl.value, 10);
    let age = parseFloat(data[3]) || 0; // use data for the age column
 
    if (
        (isNaN(min) && isNaN(max)) ||
        (isNaN(min) && age <= max) ||
        (min <= age && isNaN(max)) ||
        (min <= age && age <= max)
    ) {
        return true;
    }
 
    return false;
});
 
const table = new DataTable('#example');
 
// Changes to the inputs will trigger a redraw to update the table
minEl.addEventListener('input', function () {
    table.draw();
});
maxEl.addEventListener('input', function () {
    table.draw();
});