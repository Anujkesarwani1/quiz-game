import axios from 'axios'
import { BackendURL } from 'utils/constant'

export const API = axios.create({
  baseURL: BackendURL,
})
