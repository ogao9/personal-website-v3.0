export default {
    name: 'Project',
    title: 'Project',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
	  {
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 50,
        },
      },
      {
        name: 'date',
        title: 'Date Published',
        type: 'date',
      },
      {
        name: 'externalLink',
        title: 'External Link',
        type: 'url',
      },
      {
        name: 'githubLink',
        title: 'Github Link',
        type: 'url',
      },
      {
        name: 'technologies',
        title: 'Technologies',
        type: 'array',
        of: [{type: 'string'}]
      },
      {
        name: 'image',
        title: 'Cover Image',
        description: 'Use an image with an aspect ratio of 16:9',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'body',
        title: 'Body',
        type: 'blockContent',
      },
    ],
    preview: {
      select: {
        title: 'title',
        media: 'image',
      },
    },
  }