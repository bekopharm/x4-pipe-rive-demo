/**
 * Declares .riv files from Rive so that TS can import them without barfing
 */
declare module '*.riv' {
  const content: string
  export default content
}
