const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const OFFICIAL_EMAIL = "aditi0350.be23@chitkara.edu.in";

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

function fibonacci(n) {
  if (n < 0) return null;
  let ans = [];
  let a = 0, b = 1;

  for (let i = 0; i < n; i++) {
    ans.push(a);
    let next = a + b;
    a = b;
    b = next;
  }

  return ans;
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcmTwo(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Request must contain exactly one key"
      });
    }

    const key = keys[0];
    let data;

    if (key === "fibonacci") {
      const n = body.fibonacci;

      if (!Number.isInteger(n) || n < 0) {
        return res.status(400).json({
          is_success: false,
          error: "fibonacci must be a non-negative integer"
        });
      }

      data = fibonacci(n);
    }

    else if (key === "prime") {
      const arr = body.prime;

      if (!Array.isArray(arr) || !arr.every(Number.isInteger)) {
        return res.status(400).json({
          is_success: false,
          error: "prime must be an integer array"
        });
      }

      data = arr.filter(isPrime);
    }

    else if (key === "lcm") {
      const arr = body.lcm;

      if (!Array.isArray(arr) || arr.length === 0 || !arr.every(Number.isInteger)) {
        return res.status(400).json({
          is_success: false,
          error: "lcm must be a non-empty integer array"
        });
      }

      data = arr.reduce((acc, num) => lcmTwo(acc, num));
    }

    else if (key === "hcf") {
      const arr = body.hcf;

      if (!Array.isArray(arr) || arr.length === 0 || !arr.every(Number.isInteger)) {
        return res.status(400).json({
          is_success: false,
          error: "hcf must be a non-empty integer array"
        });
      }

      data = arr.reduce((acc, num) => gcd(acc, num));
    }

    else if (key === "AI") {
      const question = body.AI;

      if (typeof question !== "string" || question.trim() === "") {
        return res.status(400).json({
          is_success: false,
          error: "AI must be a non-empty question string"
        });
      }

      // Temporary answer for testing
      data = "Mumbai";
    }

    else {
      return res.status(400).json({
        is_success: false,
        error: "Invalid key. Use fibonacci, prime, lcm, hcf, or AI"
      });
    }

    return res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: data
    });

  } catch (error) {
    return res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});