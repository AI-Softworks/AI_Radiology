import torchxrayvision as xrv
import skimage.io
import torch
import torchvision.transforms as transforms
import numpy as np

# Prepare the image:
def predict(img_path):
    img = skimage.io.imread(img_path)

    # Normalize the image: Convert 8-bit image to [-1024, 1024] range
    img = xrv.datasets.normalize(img, 255)

    # Check image dimensions and convert to single channel if necessary
    if img.ndim == 3:
        # If the image has multiple channels (e.g., RGB), convert to single channel by averaging
        img = img.mean(axis=2)
    elif img.ndim == 2:
        # If the image is already single-channel (grayscale), do nothing
        pass
    else:
        raise ValueError(f"Unsupported image dimensions: {img.shape}")

    # Add channel dimension (C, H, W)
    img = img[None, ...]  # Shape: (1, H, W)

    # Define the transformations
    transform = transforms.Compose([
        xrv.datasets.XRayCenterCrop(),
        xrv.datasets.XRayResizer(224)
    ])

    # Apply transformations
    img = transform(img)

    # Convert to PyTorch tensor and ensure it's of type float
    img = torch.from_numpy(img).float()

    # Add batch dimension (B, C, H, W)
    img = img.unsqueeze(0)  # Shape: (1, 1, 224, 224)

    # Load the pre-trained model
    model = xrv.models.DenseNet(weights="densenet121-res224-all")
    model.eval()  # Set model to evaluation mode

    # Perform inference without tracking gradients
    with torch.no_grad():
        outputs = model(img)  # Shape: (1, num_pathologies)

    # Convert outputs to numpy and create a dictionary of predictions
    predictions = dict(zip(model.pathologies, outputs[0].cpu().numpy()))

    # Convert predictions and maxVal to native Python types
    # predictions = {k: float(v) for k, v in predictions.items()}
    maxVal = float(max(predictions.values()))
    
    temp = "temp"
    for key, value in predictions.items():
        if value == maxVal:
            temp = key
            

    # Return the predictions and the maximum value
    return temp, maxVal


