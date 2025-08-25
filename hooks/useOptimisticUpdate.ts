"use client"

import { useState, useCallback, useTransition } from 'react'

interface OptimisticState<T> {
  data: T
  isUpdating: boolean
  error: Error | null
}

export function useOptimisticUpdate<T>(
  initialData: T,
  updateFn: (newData: T) => Promise<T>
) {
  const [state, setState] = useState<OptimisticState<T>>({
    data: initialData,
    isUpdating: false,
    error: null,
  })
  const [isPending, startTransition] = useTransition()

  const optimisticUpdate = useCallback(
    (optimisticData: T | ((prev: T) => T)) => {
      // Immediately update UI with optimistic data
      setState(prev => ({
        ...prev,
        data: typeof optimisticData === 'function' 
          ? (optimisticData as (prev: T) => T)(prev.data)
          : optimisticData,
        isUpdating: true,
        error: null,
      }))

      // Start transition for smooth update
      startTransition(async () => {
        try {
          // Get the current optimistic data
          const currentData = typeof optimisticData === 'function'
            ? (optimisticData as (prev: T) => T)(state.data)
            : optimisticData

          // Call the actual update function
          const confirmedData = await updateFn(currentData)
          
          // Update with confirmed data from server
          setState({
            data: confirmedData,
            isUpdating: false,
            error: null,
          })
        } catch (error) {
          // Revert to original data on error
          setState(prev => ({
            ...prev,
            data: initialData,
            isUpdating: false,
            error: error as Error,
          }))
        }
      })
    },
    [initialData, updateFn, state.data]
  )

  const reset = useCallback(() => {
    setState({
      data: initialData,
      isUpdating: false,
      error: null,
    })
  }, [initialData])

  return {
    data: state.data,
    isUpdating: state.isUpdating || isPending,
    error: state.error,
    optimisticUpdate,
    reset,
  }
}

// Example usage for favorites
export function useFavorites(initialFavorites: string[] = []) {
  const updateFavorites = async (newFavorites: string[]) => {
    // Simulate API call
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorites: newFavorites }),
    })
    
    if (!response.ok) throw new Error('Failed to update favorites')
    
    const data = await response.json()
    return data.favorites
  }

  const {
    data: favorites,
    isUpdating,
    error,
    optimisticUpdate,
  } = useOptimisticUpdate(initialFavorites, updateFavorites)

  const toggleFavorite = useCallback((id: string) => {
    optimisticUpdate(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }, [optimisticUpdate])

  return {
    favorites,
    isUpdating,
    error,
    toggleFavorite,
    isFavorite: (id: string) => favorites.includes(id),
  }
}