const { Validator } = require("node-input-validator");
const query = require("../model/db");

exports.registerDomain = async (req, res) => {
  try {
    // Validation
    const v = new Validator(req.body, {
      shop_name: "required|string|maxLength:10",
      owner_name: "required|string|maxLength:150",
      email: "required|email|maxLength:255",
      password: "nullable|string",
      city: "required|string|maxLength:12",
    });

    const matched = await v.check();

    if (!matched) {
      return res.status(422).json({
        success: 0,
        message: "Validation failed",
        errors:  Object.values(v.errors),
      });
    }

    // Get values from request body
    const {
      shop_name,
      owner_name,
      email,
      password,
      city,
    } = req.body;

    // Check whether shop already exists
    query(
      "SELECT id FROM am_register WHERE shop_name = ?",
      [shop_name],
      (error, tenant) => {
        if (error) {
          console.error("Database error:", error);

          return res.status(500).json({
            success: 0,
            message: "Failed to check shop!",
          });
        }

        // Shop already exists
        if (tenant.length > 0) {
          return res.status(409).json({
            success: 0,
            message: "Shop already exists",
          });
        }

        // Create subdomain
        const subdomain = `${shop_name.toLowerCase()}.aadagam.com`;

        // Data to insert
        const reqData = {
          shop_name: shop_name,
          owner_name: owner_name,
          email: email,
          password: password,
          city: city,
          subdomain: subdomain,
        };

        // Insert into database
        query(
          "INSERT INTO am_register SET ?",
          reqData,
          (error, result) => {
            if (error) {
              console.error("Insert error:", error);

              return res.status(500).json({
                success: 0,
                message: "Registration failed",
              });
            }

            return res.status(201).json({
              success: 1,
              message: "Registered successfully",
              data: {
                id: result.insertId,
                shop_name: shop_name,
                domain: subdomain,
              },
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Register domain error:", error);

    return res.status(500).json({
      success: 0,
      message: "Internal server error",
    });
  }
};