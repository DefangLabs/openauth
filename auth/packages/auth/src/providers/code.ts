import { CodeProvider } from "@openauthjs/openauth/provider/code"
import { CodeUI } from "@openauthjs/openauth/ui/code"
import { ProviderData } from "./provider-data-schema"

export function getCodeData(email: string): ProviderData {
  return {
    id: email as ProviderData['id'],
    email: email as ProviderData['email'],
    name: email.split('@')[0],
  }
}

export const codeProvider = CodeProvider(CodeUI({
  async sendCode(claims, code) {
    // Implement code-sending logic here. Probably use SES or something.
    console.log('sendCode', claims, code)
  }
}))