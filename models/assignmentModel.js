
exports.addAssignments = (assignments, callback) => {
    const values = assignments.map(assign => [assign.employee_id, assign.secret_child_id]);
    db.query("INSERT INTO assignments (employee_id, secret_child_id) VALUES ?", [values], callback);
  };
  
  exports.getAssignments = (callback) => {
    db.query("SELECT * FROM assignments", callback);
  };
  