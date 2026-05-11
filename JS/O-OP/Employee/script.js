class Employee {
  constructor(name, role, salary) {
    this.name = name;
    this.role = role;
    this.salary = salary;
  }
}

class HR {
  addEmployee(employee) {
    console.log("New Employee added", employee.name);

    this.saveEmployee(employee);
  }

  saveEmployee(employee) {
    console.log("Employee saved", employee.name);
  }

  editEmployee(employee) {
    console.log("Employee edited", employee.name);
    this.saveEmployee(employee);
  }
  deleteEmployee(employee) {
    console.log("Employee deleted", employee);
  }
}

class Salary {
  calcuatePayment(employee) {
    return employee.salary * 12;
  }
}

class EmployeeSystem {
  hr;
  salary;
  constructor(hr, salary) {
    this.hr = hr;
    this.salary = salary;
  }

  Promotion(employee, newRole) {
    console.log("Promoting employee...");
    employee.role = newRole;
    this.hr.editEmployee(employee);
    console.log("New Role", employee.role);
  }
  condition(employee, bonus) {
    const baseSalary = this.salary.calcuatePayment(employee);
    const finalPayment = baseSalary + bonus;

    console.log("final Payment", finalPayment);
    console.log("Bonus", bonus);
    console.log("baseSalary", baseSalary);
  }
}

class EmployeeUI {
  //constructor
  //render(html, createElement...........)
  render() {
    const card = document.createElement("div");
    card.innerHTML = `
    <img src="https://unsplash.com/s/photos/employee" alt="">
    <p>Employee Name</p>
    <p>Employee role</p>
    <p>Employee Salary</p>
    <button>Promote</button>`;

    card.querySelector(".promote"); // EventListener
  }
}
