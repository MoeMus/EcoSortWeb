import tensorflow as tf
import tensorflow_hub as hub
hub_model = hub.load("https://www.kaggle.com/models/google/circularnet/TensorFlow2/1/1")

# get an input size of images on which an Instance Segmentation model is trained
hub_model_fn = hub_model.signatures["serving_default"]
height=hub_model_fn.structured_input_signature[1]['inputs'].shape[1]
width = hub_model_fn.structured_input_signature[1]['inputs'].shape[2]
input_size = (height, width)

# apply pre-processing functions which were applied during training the model
image_np_cp = cv2.resize(image_np[0], input_size[::-1], interpolation = cv2.INTER_AREA)
image_np = build_inputs_for_segmentation(image_np_cp)
image_np = tf.expand_dims(image_np, axis=0)

# running inference
results = hub_model_fn(image_np)