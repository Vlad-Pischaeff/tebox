// Something like this should work:

parent.document.getElementById('idhere').name;

// You have to use the parent and then get the element either byId, Name, etc...
// then access the name property.

// So your code should be like:

<iframe name="thename">
    <script type="text/javascript">
        var iframeName = parent.document.getElementById('idhere').name;
    </script>
</iframe>

// ------------------- ANOTHER METHOD -----------------------

// In your main homepage, add this line-

window.postMessage("Hello data from Homepage");

// Inside your iframe , add this line-

window.addEventListener("message", receiveDataFromWeb);

const receiveDataFromWeb=  (data)=> {
    console.log(data);
    //this should print Hello data from Homepage
}

