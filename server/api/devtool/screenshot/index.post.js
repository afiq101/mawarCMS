import puppeteer from "puppeteer";

import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  try {
    // const {body} = await readBody(event);

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });

    /*
    "/dashboard",
      "/devtool/config/environment",
      "/devtool/menu-editor",
      "/devtool/user-management/user-list",
      "/devtool/user-management/role-list",
      "/devtool/content-editor",
      "/devtool/content-editor/code?page=dashboard",
      "/devtool/content-editor/template",
      "/devtool/content-editor/template/view/dxtM4vP",
      "/devtool/api-editor",
      "/devtool/api-editor/code?path=/api/auth/login.post",
    */
    // Array of paths you want to screenshot
    const paths = [
      {
        path: "/login",
        name: "login",
      },
      {
        path: "/dashboard",
        name: "dashboard",
      },
      {
        path: "/devtool/config/environment",
        name: "environment",
      },
      {
        path: "/devtool/menu-editor",
        name: "menu-editor",
      },
      {
        path: "/devtool/user-management/user-list",
        name: "user-list",
      },
      {
        path: "/devtool/user-management/role-list",
        name: "role-list",
      },
      {
        path: "/devtool/content-editor",
        name: "content-editor",
      },
      {
        path: "/devtool/content-editor/code?page=dashboard",
        name: "content-editor-dashboard",
      },
      {
        path: "/devtool/content-editor/template",
        name: "content-editor-template",
      },
      {
        path: "/devtool/content-editor/template/view/dxtM4vP",
        name: "content-editor-template-view",
      },
      {
        name: "/devtool/api-editor",
        name: "api-editor",
      },
      {
        name: "/devtool/api-editor/code?path=/api/auth/login.post",
        name: "api-editor-login",
      },
    ];

    const savePath = path.join(process.cwd(), "public", "screenshots");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
    }

    // Loop through the paths and take a screenshot
    for (let item of paths) {
      if (item.path.includes("/login")) {
        await page.goto(`http://localhost:3000${item.path}`, {
          waitUntil: "networkidle2",
        });

        await page.waitForSelector("#input_0");
      } else {
        await page.setCookie({
          name: "accessToken",
          value:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiRGV2ZWxvcGVyIl0sImlhdCI6MTcyMDE0NjU0NCwiZXhwIjoxNzIwMjMyOTQ0fQ.-Eub9czs8ZbsUHaPe-cbzx4uT46S-0RV-RtVh2s3A1A",
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });

        await page.setCookie({
          name: "refreshToken",
          value:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiRGV2ZWxvcGVyIl0sImlhdCI6MTcyMDE0NjU0NCwiZXhwIjoxNzIyNzM4NTQ0fQ.CSeQoBGPNDpC0AnXKUpPFoVFGd1fBFa9A86wxmOkW6Y",
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });

        await page.setCookie({
          name: "user",
          value:
            "%7B%22username%22%3A%22admin%22%2C%22roles%22%3A%5B%22Developer%22%5D%2C%22isAuth%22%3Atrue%7D",
        });

        // Navigate to the page
        await page.goto(`http://localhost:3000${item.path}`, {
          waitUntil: "networkidle0",
        });

        //   Wait for the content to load
        await page.waitForSelector(".content-page");
      }

      // Take screenshot
      await page.screenshot({
        path: `${savePath}/${item.name}.png`,
        fullPage: true,
      });

      console.log(`Screenshot saved for ${item.name} at ${savePath}`);
    }

    // Close the browser
    await browser.close();

    return {
      statusCode: 200,
      message: "Success",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});
