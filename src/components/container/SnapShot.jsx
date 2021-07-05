import React from 'react'

function TakeSnapShot(){	
	const canvas = document.getElementById("board");
	const width = canvas.getAttribute("width");
	const height = canvas.getAttribute("height");
	var link = document.createElement('a');
	link.download = "screenshot.png";
	link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
	link.click();
}

function SnapShot() {
    return (
    <div className="take-snapshot">
        <button className="snapshot-button" onClick = {TakeSnapShot}> Take A Snapshot</button>
    </div>
    )
}

export default SnapShot