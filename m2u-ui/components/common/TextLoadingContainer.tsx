import React from 'react'
import TextLoading from './TextLoading'

export default function TextLoadingContainer({ loading, title }: { loading: boolean; title: string }) {
  return loading ? <TextLoading /> : ` ${title}`
}
