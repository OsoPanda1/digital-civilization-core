import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Settings, Camera, Edit2, MapPin, Calendar, 
  Link as LinkIcon, Star, Award, Zap, Grid, Heart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const tabs = ['Posts', 'Media', 'Likes', 'NFTs'];

export default function Profile() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [activeTab, setActiveTab] = useState('Posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    display_name: '',
    username: '',
    bio: '',
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleEditClick = () => {
    setEditForm({
      display_name: profile?.display_name || '',
      username: profile?.username || '',
      bio: profile?.bio || '',
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cover & Avatar */}
      <div className="relative">
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 rounded-2xl overflow-hidden">
          {profile?.cover_url && (
            <img src={profile.cover_url} alt="" className="w-full h-full object-cover" />
          )}
          <button className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors">
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="absolute -bottom-16 left-6 flex items-end gap-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
              <div className="w-full h-full rounded-xl bg-card overflow-hidden flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-primary rounded-lg hover:bg-primary/80 transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={updateProfile.isPending}>
                {updateProfile.isPending ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          ) : (
            <Button onClick={handleEditClick}>
              <Edit2 className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-16 px-4 space-y-4">
        {isEditing ? (
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm text-muted-foreground">Nombre</label>
              <Input
                value={editForm.display_name}
                onChange={(e) => setEditForm(prev => ({ ...prev, display_name: e.target.value }))}
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Usuario</label>
              <Input
                value={editForm.username}
                onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') }))}
                placeholder="usuario"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Bio</label>
              <Textarea
                value={editForm.bio}
                onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Cuéntanos sobre ti..."
                rows={3}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-display font-bold">{profile?.display_name || 'Usuario'}</h1>
              {profile?.is_verified && (
                <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                </span>
              )}
              {profile?.is_creator && (
                <span className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
                  Creador
                </span>
              )}
            </div>
            <p className="text-muted-foreground">@{profile?.username}</p>
            {profile?.bio && <p className="max-w-xl">{profile.bio}</p>}
          </>
        )}

        {/* Stats */}
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Se unió {profile?.created_at && formatDistanceToNow(new Date(profile.created_at), { addSuffix: true, locale: es })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-6">
          <button className="hover:underline">
            <span className="font-bold">{profile?.following_count || 0}</span>
            <span className="text-muted-foreground ml-1">Siguiendo</span>
          </button>
          <button className="hover:underline">
            <span className="font-bold">{profile?.followers_count || 0}</span>
            <span className="text-muted-foreground ml-1">Seguidores</span>
          </button>
        </div>
      </div>

      {/* Level & Tokens */}
      <div className="grid md:grid-cols-3 gap-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nivel</p>
              <p className="text-2xl font-bold">{profile?.level || 1}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{profile?.xp || 0} XP</span>
              <span>{(profile?.level || 1) * 1000} XP</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                style={{ width: `${((profile?.xp || 0) / ((profile?.level || 1) * 1000)) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tokens</p>
              <p className="text-2xl font-bold">{profile?.tokens || 0} <span className="text-sm text-muted-foreground">TAMV</span></p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Logros</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-8 px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 pb-8">
        {activeTab === 'Posts' && (
          <div className="text-center py-12">
            <Grid className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aún no has publicado nada</p>
            <Button className="mt-4" variant="outline">
              Crear tu primer post
            </Button>
          </div>
        )}
        {activeTab === 'Media' && (
          <div className="text-center py-12">
            <Camera className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No hay fotos o videos</p>
          </div>
        )}
        {activeTab === 'Likes' && (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No has dado like a nada aún</p>
          </div>
        )}
        {activeTab === 'NFTs' && (
          <div className="text-center py-12">
            <Award className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No tienes NFTs</p>
          </div>
        )}
      </div>
    </div>
  );
}
