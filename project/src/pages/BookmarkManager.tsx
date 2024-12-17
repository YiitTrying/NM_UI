import { useState, useEffect } from 'react';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { fetchBookmarkGroups, createBookmarkGroup } from '@/lib/api-client';
import { useAsync } from '@/hooks/use-async';
import type { BookmarkGroup } from '@/types';

export function BookmarkManager() {
  const [groups, setGroups] = useState<BookmarkGroup[]>([]);
  const [newGroupName, setNewGroupName] = useState('');

  const { execute: loadGroups } = useAsync(fetchBookmarkGroups, {
    onSuccess: setGroups,
    errorMessage: 'Failed to load bookmark groups',
  });

  const { execute: handleCreateGroup, isLoading: isCreating } = useAsync(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newGroupName.trim()) return;

      await createBookmarkGroup(newGroupName);
      setNewGroupName('');
      loadGroups();
    },
    {
      errorMessage: 'Failed to create bookmark group',
    }
  );

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Bookmarks</h1>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleCreateGroup} className="flex gap-4">
            <Input
              placeholder="Enter group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isCreating}>
              <PlusIcon className="mr-2 h-4 w-4" />
              {isCreating ? 'Creating...' : 'Create Group'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardContent className="flex items-center justify-between p-6">
              <span className="font-medium">{group.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {groups.length === 0 && (
        <p className="text-center text-muted-foreground">
          No bookmark groups yet. Create one to get started.
        </p>
      )}
    </div>
  );
}