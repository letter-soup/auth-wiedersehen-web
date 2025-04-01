import { describe, expect, it } from 'vitest'
import { mount } from '@/lib/tests/mount'
import SignInView from '@/views/SignInView.vue'

describe('SignInView (snapshot)', () => {
  it('renders properly', async () => {
    const wrapper = mount(SignInView)

    expect(wrapper).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
