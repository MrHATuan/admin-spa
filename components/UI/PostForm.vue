<template>
  <form @submit.prevent="onSave">
    <AppInput v-model="editedPost.author">
      Author Name
    </AppInput>
    <AppInput v-model="editedPost.title">
      Title
    </AppInput>
    <div class="input-control">
      <label>Thumbnail Image</label>
      <input @change="event => processInputImage(event)" type="file" class="input-file" accept=".jpg,.png">
      <img v-if="editedPost.thumbnail" :src="editedPost.thumbnail" class="thumbnail-img">
    </div>
    <AppInput v-model="editedPost.description" control-type="textarea">
      Description
    </AppInput>
    <AppInput v-model="editedPost.content" control-type="textarea">
      Content
    </AppInput>

    <div>
      <AppButton type="submit">
        Save
      </AppButton>
      <AppButton
        @click="onCancel"
        type="button"
        style="margin-left: 10px"
        btn-style="cancel"
      >
        Cancel
      </AppButton>
      <AppButton
        v-if="isEdit"
        @click="onDelete"
        type="button"
        style="margin-left: 10px; float: right;"
        btn-style="delete"
      >
        Delete
      </AppButton>
    </div>
  </form>
</template>

<script>
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'

export default {
  components: {
    AppInput,
    AppButton
  },
  props: {
    post: {
      type: Object,
      required: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
          author: '',
          title: '',
          thumbnail: '',
          description: '',
          content: ''
        }
    }
  },
  methods: {
    onSave () {
      this.$emit('submit', this.editedPost)
    },
    onCancel () {
      this.$router.push('/')
    },
    onDelete () {
      if (this.isEdit) {
        this.$emit('delete', this.editedPost)
      }
    },
    async processInputImage (event) {
      const fileUpload = event.target.files[0]
      if (fileUpload) {
        this.editedPost.thumbnail = await this.convertBase64(fileUpload)
      } else {
        this.editedPost.thumbnail = ''
      }
    },
    convertBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }
  }
}
</script>
