# PDF to Image Converter API

An Express.js server that allows users to download a PDF from a given URL, extract the first page, and convert it into a JPEG image using the pdf-poppler library. This API is designed to handle multiple concurrent requests efficiently, ensuring that each request operates in isolation to avoid conflicts.

## Features

- Downloads a PDF from a provided URL.
- Converts the first page of the PDF to a JPEG image.
- Handles multiple requests simultaneously without filename collisions.
- Automatically cleans up temporary files and directories after serving the image.

## Endpoint

### GET `/get-first-page-image`

**Query Parameters:**

- `pdfUrl` - The URL of the PDF to be converted.

**Response:**

- Returns the first page of the PDF as a JPEG image.

## Example

### Request:

```bash
curl "http://localhost:3000/get-first-page-image?pdfUrl=https://example.com/sample.pdf"
```

### Response:

- The server will return the first page of the provided PDF as a JPEG image file.

### Example Output:

A downloaded image named `output-1.jpg` located in a temporary directory.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Punit-esh/PDF-to-Image-Converter-API.git
   cd PDF-to-Image-Converter-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. The server will be running on `http://localhost:3000`.

## Usage

Send a GET request to the endpoint with the `pdfUrl` query parameter to receive the first page of the PDF as an image. Make sure the PDF URL is accessible and valid.
