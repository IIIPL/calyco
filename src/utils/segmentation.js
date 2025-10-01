// /src/utils/segmentation.js

import * as deeplab from '@tensorflow-models/deeplab';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-core';

// Cache the model to avoid reloading
let model = null;

/**
 * Loads the DeepLab model with PASCAL base and caches it
 * @returns {Promise<Object>} The loaded DeepLab model
 */
export async function loadSegmentationModel() {
  if (!model) {
    try {
      model = await deeplab.load({
        base: 'pascal',
        quantizationBytes: 2, // Optional: for smaller model size
      });
      console.log('DeepLab model loaded successfully');
    } catch (error) {
      console.error('Error loading DeepLab model:', error);
      throw error;
    }
  }
  return model;
}

/**
 * Segments an image using the loaded DeepLab model
 * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageData} imgElement - The image to segment
 * @returns {Promise<Object>} An object containing the labelMap and dimensions
 */
export async function segmentImage(imgElement) {
  if (!model) {
    await loadSegmentationModel();
  }
  
  try {
    const segmentation = await model.segment(imgElement);
    
    // Return the labelMap and dimensions
    return {
      labelMap: segmentation.segmentationMap || segmentation.legend, // model variance
      dimensions: {
        height: segmentation.height,
        width: segmentation.width
      }
    };
  } catch (error) {
    console.error('Error during image segmentation:', error);
    throw error;
  }
}