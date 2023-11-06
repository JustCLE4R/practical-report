function closeAlert(closeButton) {
	// Find the parent alert div and remove it
	var alertDiv = closeButton.parentElement;
	alertDiv.style.display = "none";
}