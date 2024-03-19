export default function PageLayout(props: IProps): RC {
  return (
    <main {...props} className="mx-auto w-[960px]">
      {props.children}
    </main>
  )
}
