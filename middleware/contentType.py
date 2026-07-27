"""
Content-Type validation middleware.
Ensures requests use application/json for POST/PUT/PATCH operations.
"""
from fastapi import Request, status
from fastapi.responses import JSONResponse


async def content_type_middleware(request: Request, call_next):
    """
    Validate Content-Type header for requests with body.
    """
    if request.method in ["POST", "PUT", "PATCH"]:
        content_type = request.headers.get("content-type", "")
        
        # Extract base content type (ignore charset, etc.)
        base_content_type = content_type.split(";")[0].strip().lower()
        
        if base_content_type != "application/json":
            return JSONResponse(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                content={
                    "error": "Content-Type must be application/json",
                    "received": content_type or "none"
                }
            )
    
    response = await call_next(request)
    return response
