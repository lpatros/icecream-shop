
export { mockIcecream } from './mockIcecream.js';
export { mockNews } from './mockNews.js';
export { mockUsers } from './mockUsers.js';

import { mockIcecream as _mockIcecream } from './mockIcecream.js';
import { mockNews as _mockNews } from './mockNews.js';
import { mockUsers as _mockUsers } from './mockUsers.js';

const mockData = {
  mockIcecream: _mockIcecream,
  mockNews: _mockNews,
  mockUsers: _mockUsers,
};

export default mockData;