exports.healthCheck = (req, res) => {
  // Perform any logic needed for the health check, if necessary.
  // For now, we return a simple success status.

  res.status(200).json({ status: "Healthy ok" });
};
