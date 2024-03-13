import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { ApiResponse, ResponseFiltersType } from "./types";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const DEFAULT_PAGE_SIZE = 150;

app.get("/:formId/filteredResponses", async (req: Request, res: Response) => {
  const pageSize = parseInt(req.query.limit as string) || DEFAULT_PAGE_SIZE;
  const { formId } = req.params;

  const filters: ResponseFiltersType = req.query.filters
    ? JSON.parse(req.query.filters as string)
    : [];

  try {
    const url = `${process.env.FILLOUT_BASE_URL}/v1/api/forms/${formId}/submissions`;
    const { data } = await axios.get<ApiResponse>(url, {
      headers: { Authorization: `Bearer ${process.env.FILLOUT_API_KEY}` },
      params: { ...req.query, filters: undefined },
    });

    let filteredResponses = data.responses.filter((response) => {
      return filters.every((filter) => {
        const question = response.questions.find((q) => q.id === filter.id);

        if (!question) return false;

        switch (filter.condition) {
          case "equals":
            return question.value === filter.value;
          case "does_not_equal":
            return question.value !== filter.value;
          case "greater_than":
            return Number(question.value) > Number(filter.value);
          case "less_than":
            return Number(question.value) < Number(filter.value);
          default:
            return true;
        }
      });
    });

    const newPageCount = Math.ceil(filteredResponses.length / pageSize);

    res.json({
      responses: filteredResponses,
      totalResponses: filteredResponses.length,
      pageCount: newPageCount,
    });
  } catch (error) {
    console.error("Error fetching form responses:", error);
    res.status(500).json({ message: "Error fetching form responses", error });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
