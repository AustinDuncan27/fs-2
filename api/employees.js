import express from "express";
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from "#db/queries/employees";

const router = express.Router();
export default router;

function isValidId(id) {
  const num = Number(id);
  if (!Number.isInteger(num)) {
    return false;
  }
  if (num < 0) {
    return false;
  }
  if (id.includes("e")) {
    return false;
  }
  return true;
}
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res.status(400).json({ error: "name, birthday, and salary are required" });
    }
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "id must be a positive integer" });
    }
    const id = Number(req.params.id);
    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "id must be a positive integer" });
    }
    const id = Number(req.params.id);
    const employee = await deleteEmployee(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "id must be a positive integer" });
    }
    const id = Number(req.params.id);
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res.status(400).json({ error: "name, birthday, and salary are required" });
    }
    const employee = await updateEmployee({ id, name, birthday, salary });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});