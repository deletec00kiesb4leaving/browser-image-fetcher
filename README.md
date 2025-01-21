# Image Extractor

This project aims to extract images from any given URL and display them directly on a web page. It's particularly useful for quick previews of images on web pages without needing to navigate to the original site.

## Project Goals

- **Image Extraction**: Automatically fetch images from external URLs.
- **CORS Management**: Overcome Cross-Origin Resource Sharing (CORS) issues by using a proxy service, allowing images to be displayed from different domains.
- **User-Friendly Display**: Present images in a gallery format within the user's browser, enhancing visual content consumption.

## How It Works

The script works by:

- **Fetching Content**: When provided with a URL, the script uses a CORS proxy to retrieve the HTML content of the page.
- **Image Detection**: It scans through the fetched HTML to locate all `<img>` tags and extracts the `src` attributes of images that meet specific criteria (like file type and potentially domain).
- **URL Processing**: Since images might be referenced with different protocols or relative paths, the script adjusts these URLs to ensure they are accessible for display.
- **Displaying Images**: The extracted images are then dynamically added to the page, providing a gallery view where users can see each image with the option to open it in a new tab.

## Considerations

- **Security**: The script uses external services to bypass CORS, which introduces security considerations. Always ensure that the source of the images is trusted to avoid malicious content.
- **Dependency on External Services**: The use of a public CORS proxy like `corsproxy.io` means the project's functionality could be affected by the service's availability or terms of use.

This project serves as a practical example of web scraping techniques and handling cross-origin issues in a browser environment, offering both educational and practical value.
