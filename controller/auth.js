const { Validator } = require("node-input-validator");
const query = require("../model/db");

const registerDomain = async (req, res) => {
  try {
    // 1. Input validation
    const v = new Validator(req.body, {
      name: "required|string|maxLength:150",
      email: "required|email|maxLength:255",
      template: "required|string|maxLength:100",
      logo: "nullable|url",
      primary_color: "nullable|string",
      secondary_color: "nullable|string",
      hero_title: "nullable|string|maxLength:255",
      hero_description: "nullable|string|maxLength:1000",
      hero_image: "nullable|url",
    });

    const matched = await v.check();

    if (!matched) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: v.errors,
      });
    }

    // 2. Get request data
    const {
      name,
      email,
      template,
      logo,
      primary_color,
      secondary_color,
      hero_title,
      hero_description,
      hero_image,
    } = req.body;

    // 3. Check subdomain already exists
    query(
      "SELECT id FROM am_register WHERE name = ?",
      [name],
      (error, tenant) => {
        if (error) {
          console.error("Database error:", error);

          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }

        if (tenant.length > 0) {
          return res.status(409).json({
            success: false,
            message: "Subdomain already exists",
          });
        }

        // 4. Insert tenant
        query(
          `INSERT INTO am_register
          (
            name,
            email,
            subdomain,
            template,
            logo,
            primary_color,
            secondary_color,
            hero_title,
            hero_description,
            hero_image
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            name,
            email,
            `${name}.maindomain.com`,
            template,
            logo || null,
            primary_color || null,
            secondary_color || null,
            hero_title || null,
            hero_description || null,
            hero_image || null,
          ],
          (error, result) => {
            if (error) {
              console.error("Insert error:", error);

              return res.status(500).json({
                success: false,
                message: "Registration failed",
              });
            }

            // 5. Success response
            return res.status(201).json({
              success: true,
              message: "Registered successfully",
              data: {
                id: result.insertId,
                name,
                domain: `${name}.maindomain.com`,
              },
            });
          },
        );
      },
    );
  } catch (error) {
    console.error("Register domain error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {registerDomain};