const intersectionObserverMock = () => ({
    observe: jest.fn,
    disconnect: jest.fn,
    unobserve: jest.fn,
})
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
