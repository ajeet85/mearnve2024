export const apiKey = '1jbxr3odgvum610yfmbx9i2sgmplakrd4yv5naqumz82f3jg';

export const editorConfig = {
  plugins: 'autoresize anchor autolink charmap code emoticons image link lists media searchreplace table visualblocks wordcount',

  toolbar: 'undo redo | code | bold italic underline strikethrough | link image | numlist bullist | emoticons charmap | removeformat',
  valid_elements: '*[*]',
  tinycomments_mode: 'embedded',
  tinycomments_author: 'Author name',
  autoresize_min_height: 100,
  autoresize_max_height: 500,
  mergetags_list: [
    { value: 'First.Name', title: 'First Name' },
    { value: 'Email', title: 'Email' },
  ],
  ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
};