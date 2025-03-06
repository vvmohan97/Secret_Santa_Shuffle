

exports.getPreviousAssignments = (callback) => {
    db.query("SELECT * FROM previous_assignments", callback);
  };
  